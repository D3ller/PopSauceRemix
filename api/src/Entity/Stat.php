<?php

namespace App\Entity;

use App\Repository\StatRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;

#[ORM\Entity(repositoryClass: StatRepository::class)]
#[ApiResource()]
class Stat
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column]
    private ?int $nb_game = null;

    #[ORM\Column]
    private ?int $nb_victoire = null;

    #[ORM\OneToOne(inversedBy: 'stat', cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $user = null;

   
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNbGame(): ?int
    {
        return $this->nb_game;
    }

    public function setNbGame(int $nb_game): self
    {
        $this->nb_game = $nb_game;

        return $this;
    }

    public function getNbVictoire(): ?int
    {
        return $this->nb_victoire;
    }

    public function setNbVictoire(int $nb_victoire): self
    {
        $this->nb_victoire = $nb_victoire;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

}
