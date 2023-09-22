<?php

/**
 * single professor page
 */

get_header();
while (have_posts()) {
    the_post();
    pageBanner();
?>
    <div class="container container--narrow page-section">
        <div class="generic-content">
            <div class="row group">
                <div class="one-third">
                    <?php the_post_thumbnail('professorPortrait'); ?>
                </div>
                <div class="two-thirds">
                    <?php the_content(); ?>
                </div>
            </div>
        </div>
        <?php
        $relatedPrograms = get_field('related_programs');
        if ($relatedPrograms) {
            echo '<hr class="ection-break">';
            echo '<h2 class="headline headline--medium">Subjects Taught</h2>';
            foreach ($relatedPrograms as $program) {
        ?>
                <ul class="link-list min-list">
                    <li><a href="<?php echo get_the_permalink($program); ?>">
                            <?php echo get_the_title($program); ?>
                        </a></li>
                </ul>
        <?php }
        }
        ?>

    </div>


<?php
}
get_footer();
?>