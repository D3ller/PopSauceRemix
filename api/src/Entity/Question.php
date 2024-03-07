<?php

namespace App\Entity;

use App\Repository\QuestionRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: QuestionRepository::class)]
#[ApiResource()]
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

   
}
