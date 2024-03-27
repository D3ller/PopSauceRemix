<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Themes; // Importation de l'entité Themes
use App\Repository\ThemesRepository; // Importation du repository de l'entité Themes

class ThemesController extends AbstractController
{
    #[Route('/themes', name: 'app_themes')]
    public function index(
        ThemesRepository $themesRepository
    ): Response {
        // Récupérer tous les articles depuis le repository
        $themes = $themesRepository->findAll(); 

        // Rendre la vue en passant les articles récupérés
        return $this->render('themes/index.html.twig', [
            'themes' => $themes,
        ]);
    }
}

