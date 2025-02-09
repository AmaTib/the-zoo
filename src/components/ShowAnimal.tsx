import { IAnimal } from "../models/IAnimal";

interface IShowAnimalProp {
  moreAnimalInfo: (id: number) => void;
  animal: IAnimal;
}

export const ShowAnimal = ({ animal, moreAnimalInfo }: IShowAnimalProp) => {
  return (
    <>
      <div className="animalContainer">
        <img
          src={animal.imageUrl}
          alt="animal"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `${
              import.meta.env.BASE_URL
            }/brokenImage.png`;
          }}
        />
        <h3>
          {animal.name} ({animal.latinName})
        </h3>
        <div className="hungerStatusContainer">
          <p>Hunger:</p>
          <div
            className={`hungerStatus ${
              animal.isFed ? "statusFed" : "statusNotFed"
            }`}
          ></div>
        </div>
        <button
          onClick={() => {
            moreAnimalInfo(animal.id);
          }}
        >
          mer om {animal.name}
        </button>
      </div>
    </>
  );
};
