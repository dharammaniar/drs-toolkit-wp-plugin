<?php

function browse_ajax_handler() {
  // Handle the ajax request
  global $errors;
  check_ajax_referer( 'browse_drs' );
  $collection = drstk_get_pid();
  if ($collection == '' || $collection == NULL) {
      $data = array('error'=>$errors['search']['missing_collection']);
      $data = json_encode($data);
      wp_send_json($data);
  } elseif ($collection == "https://repository.library.northeastern.edu/collections/neu:1") {
    $data = array('error'=>$errors['search']['missing_collection']);
    $data = json_encode($data);
    wp_send_json($data);
  } else {
    if (isset($_POST['params']['collection'])){
      $url = "https://repository.library.northeastern.edu/api/v1/search/".$_POST['params']['collection']."?";
    } else {
      $url = "https://repository.library.northeastern.edu/api/v1/search/".$collection."?";
    }
    if (isset($_POST['params']['q'])){
      $url .= "q=". urlencode(sanitize_text_field($_POST['params']['q']));
    }
    if (isset($_GET['q'])){
      $url .= "q=". urlencode(sanitize_text_field($_GET['q']));
    }
    if (isset($_POST['params']['per_page'])) {
      $url .= "&per_page=" . $_POST['params']['per_page'];
    }
    if (isset($_POST['params']['page'])) {
      $url .= "&page=" . $_POST['params']['page'];
    }
    if (isset($_POST['params']['f'])) {
      foreach($_POST['params']['f'] as $facet=>$facet_val){
        $url .= "&f[" . $facet . "][]=" . urlencode($facet_val);
      }
    }
    if (isset($_POST['params']['sort'])) {
      $url .= "&sort=" . $_POST['params']['sort'];
    }
    $data = get_response($url);
    wp_send_json($data);
  }
}


function ajax_wp_search(){
  global $wp_query;
  global $paged;
  $query_string = isset($_GET['query']) ? $_GET['query'] : "";
  $paged = $_GET['page'];
  if (isset($_GET['query']) && $query_string != ''){
    $query_args = array( 's' => $query_string, 'post_type'=>array('post', 'page'), 'posts_per_page'=>3, 'paged'=>$paged);
    $wp_query = new WP_Query( $query_args );
    $rel_query = relevanssi_do_query($wp_query);
    if (count($rel_query) > 0){
        get_template_part( 'partials/content', 'normal' );
      } else {
        echo "No related content was found";
      }
  } else {
    echo "Please enter a search term to retrieve related content";
  }
  wp_reset_postdata();
  die();
}
