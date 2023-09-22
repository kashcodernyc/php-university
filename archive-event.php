<?php
get_header();
pageBanner(array(
    'title' => 'All Events',
    'subtitle' => 'List of events in our campus.'
));
?>

<div class="container container--narrow page-sectio">
    <?php
    while (have_posts()) {
        the_post();
    ?>
        <div class="event-summary">
            <a class="event-summary__date t-center" href="<?php the_permalink(); ?>">
                <span class="event-summary__month"><?php
                                                    $eventDate = new DateTime(get_field('event_date'));
                                                    echo $eventDate->format('M');
                                                    ?></span>
                <span class="event-summary__day"><?php echo $eventDate->format('d'); ?></span>
            </a>
            <div class="event-summary__content">
                <h5 class="event-summary__title headline headline--tiny"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h5>
                <p><?php echo wp_trim_words(get_the_content(), 18); ?><a href="<?php the_permalink() ?>" class="nu gray">Learn more</a></p>
            </div>
        </div>

    <?php
    }
    echo paginate_links();
    ?>
    <hr class="section-break">
    <p>Looking for past events? navigat to<a href="<?php echo site_url('/past-events') ?>"> past events</a></p>

</div>

<?php
get_footer();
?>