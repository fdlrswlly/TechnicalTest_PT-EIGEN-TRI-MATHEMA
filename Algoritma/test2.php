<html>
<?php
$string = "Saya senang mengerjakan soal algoritma";
$kata = explode(" ", $string);
$panjang = 0;
$kataterpanjang = "";

foreach ($kata as $katabaru) {
    $panjangkata = strlen($katabaru);
    if ($panjangkata > $panjang) {
        $panjang = $panjangkata;
        $kataterpanjang = $katabaru;
    }
}
echo "<p>Kata terpanjang : $kataterpanjang</p>";
echo "(" . strlen($kataterpanjang) . " Karakter)";
?>

</html>