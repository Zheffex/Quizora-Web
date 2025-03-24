<?php
// routes/locationRoutes.php

include_once '../controllers/LocationController.php';

header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['latitude']) && isset($_GET['longitude']) && isset($_GET['radius'])) {
        $latitude = $_GET['latitude'];
        $longitude = $_GET['longitude'];
        $radius = $_GET['radius'];

        // Call the controller method
        $locations = LocationController::getLocations($latitude, $longitude, $radius);

        // Return JSON response
        echo json_encode($locations);
    } else {
        echo json_encode(["message" => "Missing parameters: latitude, longitude, and radius are required."]);
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
?>
