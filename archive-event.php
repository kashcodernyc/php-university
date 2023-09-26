<?php
get_header();
pageBanner(array(
    'title' => 'All Events',
    'subtitle' => 'List of events in our campus.'
));
?>

<div class="container container--narrow page-section">
    <?php
    while (have_posts()) {
        the_post();
        get_template_part('template-parts/content-event');
    }
    echo paginate_links();
    ?>
    <hr class="section-break">
    <p>Looking for past events? navigat to<a href="<?php echo site_url('/past-events') ?>"> past events</a></p>

</div>

<?php
get_footer();
?>