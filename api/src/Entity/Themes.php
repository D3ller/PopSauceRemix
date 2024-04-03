<?php

namespace App\Entity;

use App\Repository\ThemesRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: ThemesRepository::class)]
#[ApiResource()]
class Themes
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $nom_themes = null;

    #[ORM\OneToMany(mappedBy: 'themes', targetEntity: Question::class)]
    private Collection $questions;

    #[ORM\Column(length: 255)]
    private ?string $en_themes = null;

    #[ORM\Column(length: 255)]
    private ?string $icone = null;

    public function __construct()
    {
        $this->questions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
 
    public function getNomThemes(): ?string
    {
        return $this->nom_themes;
    }

    public function setNomThemes(string $nom_themes): self
    {
        $this->nom_themes = $nom_themes;

        return $this;
    }

    /**
     * @return Collection<int, Question>
     */
    public function getQuestions(): Collection
    {
        return $this->questions;
    }

    public function addQuestion(Question $question): self
    {
        if (!$this->questions->contains($question)) {
            $this->questions->add($question);
            $question->setThemes($this);
        }

        return $this;
    }

    public function removeQuestion(Question $question): self
    {
        if ($this->questions->removeElement($question)) {
            // set the owning side to null (unless already changed)
            if ($question->getThemes() === $this) {
                $question->setThemes(null);
            }
        }

        return $this;
    }

    public function getEnThemes(): ?string
    {
        return $this->en_themes;
    }

    public function setEnThemes(string $en_themes): self
    {
        $this->en_themes = $en_themes;

        return $this;
    }

    public function getIcone(): ?string
    {
        return $this->icone;
    }

    public function setIcone(string $icone): self
    {
        $this->icone = $icone;

        return $this;
    }
}
