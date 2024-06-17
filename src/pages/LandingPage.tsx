import { useEffect, useState } from "react";
import { IAnimal } from "../models/IAnimal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./LandingPage.scss";
import { ShowAnimals } from "../components/ShowAnimals";

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
      <h2>Dina djur</h2>
      <section>
        <ShowAnimals moreAnimalInfo={moreAnimalInfo} animals={animals} />
      </section>
    </>
  );
};
