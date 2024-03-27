<?php

// src/EventSubscriber/UserRegisteredSubscriber.php

namespace App\EventSubscriber;

use ApiPlatform\Symfony\EventListener\EventPriorities;
use App\Entity\User;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\Event\ViewEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;

class RegisteredSubscriber implements EventSubscriberInterface
{
    private $mailer;
    private $user;

    public function __construct(MailerInterface $mailer)
    {
        $this->mailer = $mailer;
    }

    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::VIEW => ['onKernelResponse', EventPriorities::POST_WRITE],
        ];
    }

    public function onKernelResponse(ViewEvent $event)
    {
        $method = $event->getRequest()->getMethod();
        $entity = $event->getControllerResult();

        if (!$entity instanceof User || $method !== Request::METHOD_POST){
            return;
        }

        $userEmail = $entity->getEmail();

        $email = (new Email())
            ->from('hello@example.com')
            ->to($userEmail)
            ->subject('Time for Symfony Mailer!')
            ->text('Sending emails is fun again!')
            ->html('<p>See Twig integration for better HTML integration!</p>');

        $this->mailer->send($email);
    }
}
