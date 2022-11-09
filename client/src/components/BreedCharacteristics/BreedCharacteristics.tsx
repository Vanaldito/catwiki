import "./BreedCharacteristics.css";

interface BreedCharacteristicsProps {
  characteristics: { [key: string]: React.ReactNode };
}

export default function BreedCharacteristics({
  characteristics,
}: BreedCharacteristicsProps) {
  return (
    <div className="breed-characteristics-container">
      <table className="breed-characteristics">
        <tbody>
          {Object.entries(characteristics).map(([key, value]) => (
            <tr className="breed-characteristics__row" key={key}>
              <td className="breed-characteristics__column">
                <b>{key}:</b>
              </td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
