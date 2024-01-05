<?php
get_header();
pageBanner(array(
    'title' => 'All Programs',
    'subtitle' => 'List of programs available in our campus.'
))
?>

<div class="container container--narrow page-sectio">
    <ul class="link-list min-list">
        <?php
        while (have_posts()) {
            the_post();
        ?>
            <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>

        <?php }
        echo paginate_links();
        ?>

    </ul>
</div>

<?php
get_footer();
?>