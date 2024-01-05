<?php

/**
 * my-notes page
 */

if (!is_user_logged_in()) {
    wp_redirect(esc_url(site_url('/')));
    exit;
}

get_header();
while (have_posts()) {
    the_post();
    pageBanner(array(
        'title' => 'All Notes',
        'subtitle' => 'List of all the notes.'
    ));
?>


    <div class="container container--narrow page-section">
        <div class="create-note">
            <h2 class="headline deadline--medium">Create New Note</h2>
            <input class="new-note-title" placeholder="title">
            <textarea class="new-note-body" placeholder="type your note here."></textarea>
            <span class="submit-note">Create Note</span>
        </div>

        <ul class="min-list link-list" id="my-notes">
            <?php
            $userNotes = new WP_Query(array(
                'post_type' => 'note',
                'posts_per_page' => -1,
                'author' => get_current_user_id(),
            ));

            while ($userNotes->have_posts()) {
                $userNotes->the_post(); ?>
                <li data-id="<?php the_ID(); ?>">
                    <input readonly class="note-title-field" value="<?php echo str_replace('Private: ', "", esc_attr(get_the_title())); ?>" />
                    <span class="edit-note"><i class="bi bi-pencil" aria-hidden="true"></i>Edit</span>
                    <span class="delete-note"><i class="bi bi-trash" aria-hidden="true"></i>Delete</span>
                    <textarea readonly class="note-body-field"><?php echo esc_textarea(get_the_content()); ?></textarea>
                    <span class="update-note btn btn-sm btn-primary"><i class="bi bi-arrow-right" aria-hidden="true"></i>Save</span>
                    <span class="note-limit-message">Note limit reached! you can't have more than 4 notes.</span>
                </li>
            <?php } ?>
        </ul>
    </div>



<?php
}
get_footer();
?>