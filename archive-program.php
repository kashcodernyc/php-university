<?php
get_header();
?>
<div class="page-banner">
    <div class="page-banner__bg-image" style="background-image: url(<?php echo get_theme_file_uri('/images/library-hero.jpg'); ?>)"></div>
    <div class="page-banner__content container container--narrow">
        <h1 class="page-banner__title">All Programs</h1>
        <div class="page-banner__intro">List of programs available in our campus.</div>
    </div>
</div>
<div class="container container--narrow page-sectio">
    <ul class="link-list min-list">
        <?php
        while (have_posts()) {
            the_post();
        ?>
            <li><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></li>

        <?php }
        ?>
    </ul>

    <hr class="section-break">
    <p>Looking for past events? navigat to<a href="<?php echo site_url('/past-events') ?>"> past events</a></p>

</div>

<?php
get_footer();
?>