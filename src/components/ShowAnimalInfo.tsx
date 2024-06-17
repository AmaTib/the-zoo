import { IAnimal } from "../models/IAnimal";

interface IShowAnimalInfoProp {
  pickedAnimal: IAnimal;
  feedAnimal: (id: number) => void;
}

export const ShowAnimalInfo = ({
  pickedAnimal,
  feedAnimal,
}: IShowAnimalInfoProp) => {
  return (
    <>
      <img
        src={pickedAnimal?.imageUrl}
        alt={pickedAnimal?.name}
        onError={(e) => {
          (e.target as HTMLImageElement).src =
            "/pexels-markus-winkler-1430818-4097203.jpg";
        }}
      />
      <div className="animalInfoWrapper">
        <p>{pickedAnimal?.shortDescription}</p>
        <div>
          <p>Senast matad: {pickedAnimal?.lastFed.toLocaleString()}</p>
          {pickedAnimal && (
            <button
              onClick={() => {
                feedAnimal(pickedAnimal?.id);
              }}
              disabled={pickedAnimal?.isFed}
            >
              Mata
            </button>
          )}
        </div>
      </div>
    </>
  );
};
