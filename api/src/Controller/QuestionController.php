<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Question; // Importation de l'entité Question
use App\Repository\QuestionRepository; // Importation du repository de l'entité Question
class QuestionController extends AbstractController
{
    #[Route('/question', name: 'app_question')]
    public function index(
        QuestionRepository $QuestionRepository
    ): Response {
        // Récupérer tous les articles depuis le repository
        $questions = $QuestionRepository->findBy([], null, 10);

        // Rendre la vue en passant les articles récupérés
        return $this->render('question/index.html.twig', [
            'question' => $questions,
        ]);
    }
}
