<?php

require_once("./utils.php");

if (!session_id()) {
    session_start();
}

$limit = 5;
$lastSeenId = intval($_GET["lastSeenId"] ?? 0);

$fileContent = file_get_contents("./news.json");

$news = decode($fileContent);

$startInd = ($lastSeenId !== 0)
    ? (getItemIndexById($news, $lastSeenId) + 1)
    : 0;

$res = array_slice($news, $startInd, $limit);

echo encode($res);
