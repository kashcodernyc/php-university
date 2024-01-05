<?php
require get_theme_file_path('/inc/search-route.php');
function university_custom_rest()
{
    register_rest_field('post', 'authorName', array(
        'get_callback' => function () {
            return get_the_author();
        }
    ));
}
add_action('rest_api_init', 'university_custom_rest');

function pageBanner($args = NULL)
{
    if (!isset($args['title'])) {
        $args['title'] = get_the_title();
    }
    if (!isset($args['subtitle'])) {
        $args['subtitle'] = get_field('page_banner_subtitle');
    }
    if (!isset($args['photo'])) {
        if (get_field('page_banner_background_image') and !is_archive() and !is_home()) {
            $args['photo'] = get_field('page_banner_background_image')['sizes']['pageBanner'];
        } else {
            $args['photo'] = get_theme_file_uri('/images/ocean.jpg');
        }
    }
?>
    <div class="page-banner">
        <div class="page-banner__bg-image" style="background-image: url(<?php
                                                                        echo $args['photo'] ?>)"></div>
        <div class="page-banner__content container container--narrow">
            <h1 class="page-banner__title"><?php echo $args['title']; ?></h1>
            <div class="page-banner__intro">
                <p><? echo $args['subtitle'] ?></p>
            </div>
        </div>
    </div>

<?php }

add_action('wp_enqueue_scripts', 'university_files');
function university_files()
{
    wp_enqueue_script('main-js-file', get_theme_file_uri('/build/index.js'), array('jquery'), '1.0', true);
    wp_enqueue_script('silderjs-cdn', 'https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.2.0/glide.min.js');
    wp_enqueue_style('my-style', get_stylesheet_uri());
    wp_enqueue_style(
        'bootstrap-css',
        'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
    );
    wp_enqueue_style('sliderjs-style', 'https://cdnjs.cloudflare.com/ajax/libs/Glide.js/3.2.0/css/glide.core.min.css');
    wp_enqueue_style('bootstrap-icons', "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
    wp_localize_script('main-js-file', 'universityData', array(
        'root_url' => get_site_url(),
        'nonce' => wp_create_nonce('wp_rest')
    ));
}


add_action('after_setup_theme', 'university_features');
function university_features()
{
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_image_size('professorLandscape', 400, 260, true);
    add_image_size('professorPortrait', 480, 650, true);
    add_image_size('pageBanner', 1500, 350, true);
}

add_action('pre_get_posts', 'university_adjust_queries');
function university_adjust_queries($query)
{
    if (!is_admin() and is_post_type_archive('archive') and is_main_query()) {
        $query->set('orderby', 'tile');
        $query->set('order', 'ASC');
        $query->set('posts_per_page', -1);
    }
    if (!is_admin() and is_post_type_archive('event') and is_main_query()) {
        $today = date('Ymd');
        $query->set('meta_key', 'event_date');
        $query->set('orderby', 'meta_value_num');
        $query->set('order', 'ASC');
        $query->set('meta-query', array(
            array(
                'key' => 'event_date',
                'compare' => '>=',
                'value' => $today,
                'type' => 'numeric'
            )
        ));
    }
}

add_action('admin_init', 'redirectSubsToFrontend');
function redirectSubsToFrontend()
{
    $ourCurrentUser = wp_get_current_user();
    if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == 'subscriber') {
        wp_redirect(site_url('/'));
        exit;
    }
}


// add_action('wp_loaded', 'noSubsAdminBar');
// function noSubsAdminBar()
// {
//     $ourCurrentUser = wp_get_current_user();
//     if (count($ourCurrentUser->roles) == 1 and $ourCurrentUser->roles[0] == 'subscriber') {
//         show_admin_bar(false);
//         exit;
//     }
// }

// customize login screen
add_filter('login_headerurl', 'ourHeaderUrl');

function ourHeaderUrl()
{
    return esc_url(site_url('/'));
}


add_action('login_enque_scripts', 'ourLoginCSS');
function ourLoginCSS()
{
    wp_enqueue_style('my-style', get_stylesheet_uri());
    wp_enqueue_style(
        'bootstrap-css',
        'https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css',
    );
    wp_enqueue_style('bootstrap-icons', "https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.2/font/bootstrap-icons.css");
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css?family=Roboto+Condensed:300,300i,400,400i,700,700i|Roboto:100,300,400,400i,700,700i');
}


//force note posts to be provate
// right before data is saved
add_filter('wp_insert_post_data', 'makeNotesPrivate', 10, 2);

function makeNotesPrivate($data, $postarr)
{
    if ($data['post_type'] == 'note') {
        if (count_user_posts(get_current_user_id(), 'note') > 4 and !$postarr['ID']) {
            die("You have reached your note limit!");
        }
        $data['post-comment'] = sanitize_textarea_field($data['post_content']);
        $data['post-title'] = sanitize_text_field($data['post_title']);
    }
    if ($data['post_type'] == 'note' and $data['post_status'] != 'trash') {
        $data['post_status'] = "private";
    }
    return $data;
}
