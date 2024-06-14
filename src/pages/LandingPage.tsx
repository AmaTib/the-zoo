import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const animalsFromLs: IAnimal[] = JSON.parse(
    localStorage.getItem("animalList") || "[]"
  );
  const [animals, setAnimals] = useState<IAnimal[]>(animalsFromLs);
  const navigate = useNavigate();

  useEffect(() => {
    if (animals.length > 0) {
      return;
    }
    async function getAnimals() {
      const response = await axios.get<IAnimal[]>(
        "https://animals.azurewebsites.net/api/animals"
      );
      setAnimals(response.data);
    }
    getAnimals();
  });

  localStorage.setItem("animalList", JSON.stringify(animals));

  function moreAnimalInfo(animalId: number) {
    navigate("/animal/" + animalId);
  }

  return (
    <>
      <h1>LandingPage</h1>

      <section>
        {animals.map((animal) => (
          <div
            className="animalContainer"
            key={animal.id}
            onClick={() => {
              moreAnimalInfo(animal.id);
            }}
          >
            <img
              src={animal.imageUrl}
              alt="animal"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/pexels-pixabay-356079.jpg";
              }}
            />
            <h2>
              {animal.name} ({animal.latinName})
            </h2>
          </div>
        ))}
      </section>
    </>
  );
};
