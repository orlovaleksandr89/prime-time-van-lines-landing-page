<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exeption;

require 'phpmailer/src/Exeption.php';
require 'phpmailer/src/PHPMailer.php';
require '../vendor/autoload.php';

$mail = new PHPMailer;
if (array_key_exists('email', $_POST)) {
$mail->CharSet = 'UTF-8';
$mail->isHTML(true);
$mail->setLanguage('ru', 'phpmailer/language/');


$mail->isSMTP();
$mail->SMTPDebug = 2;
$mail->Host = 'smtp.hostinger.com';
$mail->Port = 587;
$mail->SMTPAuth = true;
$mail->Username = 'admin@oleksandr-orlov.com';
$mail->Password = '0721928Oa$';
$mail->setFrom('admin@oleksandr-orlov.com');
$mail->addReplyTo('admin@oleksandr-orlov.com');
$mail->addAddress('orlovaleksandr89@gmail.com');
$mail->Subject = 'Testing PHPMailer';


$body = '<h1>PHPMailer</h1>';

if (trim(!empty($_POST['email']))) {
  $body.= '<p>' . $_POST['email'] . '</p>';
}

// $mail->msgHTML(file_get_contents('message.html'), __DIR__);
$mail->Body = $body;
//$mail->addAttachment('test.txt');
if (!$mail->send()) {
    echo 'Mailer Error: ' . $mail->ErrorInfo;
    $message = 'Error in sending';
} else {
    echo 'The email message was sent.';
    $message = 'Succes';
}

$responce = ['message' => $message];

header('Content-Type: application/json');
echo json_encode($responce);
}
?>