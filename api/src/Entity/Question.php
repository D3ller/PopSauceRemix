<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
#[ApiResource(paginationEnabled: false)]
class Question
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $question = null;

    #[ORM\Column(length: 255)]
    private ?string $reponse_1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse_2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse_3 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse_4 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\ManyToOne(inversedBy: 'questions')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Themes $themes = null;

    #[ORM\Column(length: 255)]
    private ?string $question_en = null;

    #[ORM\Column(length: 255)]
    private ?string $reponse_1_en = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse_2_en = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse_3_en = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse_4_en = null;

   

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuestion(): ?string
    {
        return $this->question;
    }

    public function setQuestion(string $question): self
    {
        $this->question = $question;

        return $this;
    }

    public function getReponse1(): ?string
    {
        return $this->reponse_1;
    }

    public function setReponse1(string $reponse_1): self
    {
        $this->reponse_1 = $reponse_1;

        return $this;
    }

    public function getReponse2(): ?string
    {
        return $this->reponse_2;
    }

    public function setReponse2(?string $reponse_2): self
    {
        $this->reponse_2 = $reponse_2;

        return $this;
    }

    public function getReponse3(): ?string
    {
        return $this->reponse_3;
    }

    public function setReponse3(?string $reponse_3): self
    {
        $this->reponse_3 = $reponse_3;

        return $this;
    }

    public function getReponse4(): ?string
    {
        return $this->reponse_4;
    }

    public function setReponse4(?string $reponse_4): self
    {
        $this->reponse_4 = $reponse_4;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getThemes(): ?Themes
    {
        return $this->themes;
    }

    public function setThemes(?Themes $themes): self
    {
        $this->themes = $themes;

        return $this;
    }

    public function getQuestionEn(): ?string
    {
        return $this->question_en;
    }

    public function setQuestionEn(string $question_en): self
    {
        $this->question_en = $question_en;

        return $this;
    }

    public function getReponse1En(): ?string
    {
        return $this->reponse_1_en;
    }

    public function setReponse1En(string $reponse_1_en): self
    {
        $this->reponse_1_en = $reponse_1_en;

        return $this;
    }

    public function getReponse2En(): ?string
    {
        return $this->reponse_2_en;
    }

    public function setReponse2En(?string $reponse_2_en): self
    {
        $this->reponse_2_en = $reponse_2_en;

        return $this;
    }

    public function getReponse3En(): ?string
    {
        return $this->reponse_3_en;
    }

    public function setReponse3En(?string $reponse_3_en): self
    {
        $this->reponse_3_en = $reponse_3_en;

        return $this;
    }

    public function getReponse4En(): ?string
    {
        return $this->reponse_4_en;
    }

    public function setReponse4En(?string $reponse_4_en): self
    {
        $this->reponse_4_en = $reponse_4_en;

        return $this;
    }

   
}
