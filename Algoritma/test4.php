<html>
<?php
$matriks = array(
    array(1, 2, 0),
    array(4, 5, 6),
    array(7, 8, 9)
);
$leftdiagonalsum = 0;
$rightdiagonalsum = 0;

$n = count($matriks);
for ($i = 0; $i < $n; $i++) {
    $leftdiagonalsum += $matriks[$i][$i];
    $rightdiagonalsum += $matriks[$i][$n - $i - 1];
}

$diagonaldifferents = abs($leftdiagonalsum - $rightdiagonalsum);
echo "<p>Diagonal Pertama 1 + 5 + 9 = $leftdiagonalsum</p>";
echo "<p>Diagonal Kedua 0 + 5 + 7 = $rightdiagonalsum</p>";
echo "<p>Nilai Pengurangan = $diagonaldifferents</p>";

?>

</html>