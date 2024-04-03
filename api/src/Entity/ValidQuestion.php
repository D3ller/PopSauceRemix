<?php

namespace App\Entity;

use App\Repository\ValidQuestionRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: ValidQuestionRepository::class)]
#[ApiResource()]
class ValidQuestion
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $question = null;

    #[ORM\Column(length: 255)]
    private ?string $question_en = null;

    #[ORM\Column(length: 255)]
    private ?string $reponse1 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse2 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse3 = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse4 = null;

    #[ORM\Column(length: 255)]
    private ?string $reponse_en = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse2_en = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse3_en = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $reponse4_en = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

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

    public function getQuestionEn(): ?string
    {
        return $this->question_en;
    }

    public function setQuestionEn(string $question_en): self
    {
        $this->question_en = $question_en;

        return $this;
    }

    public function getReponse1(): ?string
    {
        return $this->reponse1;
    }

    public function setReponse1(string $reponse1): self
    {
        $this->reponse1 = $reponse1;

        return $this;
    }

    public function getReponse2(): ?string
    {
        return $this->reponse2;
    }

    public function setReponse2(?string $reponse2): self
    {
        $this->reponse2 = $reponse2;

        return $this;
    }

    public function getReponse3(): ?string
    {
        return $this->reponse3;
    }

    public function setReponse3(?string $reponse3): self
    {
        $this->reponse3 = $reponse3;

        return $this;
    }

    public function getReponse4(): ?string
    {
        return $this->reponse4;
    }

    public function setReponse4(?string $reponse4): self
    {
        $this->reponse4 = $reponse4;

        return $this;
    }

    public function getReponseEn(): ?string
    {
        return $this->reponse_en;
    }

    public function setReponseEn(string $reponse_en): self
    {
        $this->reponse_en = $reponse_en;

        return $this;
    }

    public function getReponse2En(): ?string
    {
        return $this->reponse2_en;
    }

    public function setReponse2En(?string $reponse2_en): self
    {
        $this->reponse2_en = $reponse2_en;

        return $this;
    }

    public function getReponse3En(): ?string
    {
        return $this->reponse3_en;
    }

    public function setReponse3En(?string $reponse3_en): self
    {
        $this->reponse3_en = $reponse3_en;

        return $this;
    }

    public function getReponse4En(): ?string
    {
        return $this->reponse4_en;
    }

    public function setReponse4En(?string $reponse4_en): self
    {
        $this->reponse4_en = $reponse4_en;

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
}
