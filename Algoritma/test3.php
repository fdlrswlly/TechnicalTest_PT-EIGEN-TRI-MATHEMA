<?php
echo "<p>INPUT = [xc, dz, bbb, dz]</p>" ;
echo "<p>QUERY = [ bbb, ac, dz ]</p>";

$input = ['xc', 'dz', 'bbb', 'dz'];
$query = ['bbb', 'ac', 'dz'];

$count = array();
foreach($query as $kata){
    $count[] = array_count_values($input)[$kata] ?? 0;
    
}
//echo $count;
print_r($count);

?>