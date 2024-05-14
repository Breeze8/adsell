<?php

$recepient = "info@awstudio.kz";
$sitename = "Innovex";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$phone = trim($_POST["phone"]);
$subject = trim($_POST["subject"]);
$messag = trim($_POST["message"]);

$message = "Name: $name \nEmail: $email \nPhone: $phone \nSubject: $subject \nMessage: $messag";

$pagetitle = "New order from \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
  mail(
    $email,
    'Thank you!',
    'Thank you! \r\n We will call you back now! Wait.', // ваш шаблон письма
    "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient"
  );
}