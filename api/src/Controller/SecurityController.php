<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    #[Route('/api/users', name: 'api_login', methods: ['POST'])]
    public function login(): Response
    {
//        $user = $this->getUser();

        return $this->json([
//            'username' => $user->getUsername(),
            'test' => 123465
        ]);
    }
}
