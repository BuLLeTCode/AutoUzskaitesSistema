<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");

$conn = new mysqli("localhost", "root", "", "auto_info");

$result = $conn->query("SELECT * FROM auto");

$outp = "";
while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
    if ($outp != "") {$outp .= ",";}
    $outp .= '{"Manufacture":"'  . $rs["Razotajs"] . '",';
    $outp .= '"Model":"'   . $rs["Marka"]        . '",';
    $outp .= '"Year":"'. $rs["Gads"]     . '"}';
}
$outp ='{"records":['.$outp.']}';
$conn->close();

echo($outp);
?>