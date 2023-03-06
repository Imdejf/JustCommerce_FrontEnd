import styled from "styled-components";

interface IDetailTableProps {
  label?: string;
  items: Array<{
    label: string;
    value: boolean;
  }>;
}

const Container = styled.div`
  input {
    -webkit-appearance: none;
    appearance: none;
    /* background-color: #fff; */
    margin: 0;
    font: inherit;
    color: #305fb3;

    border: 0.15em solid #305fb3;
    border-radius: 0.15em;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;

    :focus {
      outline: max(2px, 0.15em) solid #305fb3;
      outline-offset: max(2px, 0.15em);
    }

    :checked {
      ::before {
        transform: scale(1);
        background-color: #305fb3;
        transform-origin: bottom left;
        clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
      }
    }

    ::before {
      content: "";
      width: 0.65em;
      height: 0.65em;
      transform: scale(0);
      transition: 120ms transform ease-in-out;
      box-shadow: inset 1em 1em var(--form-control-color);
    }
  }
`;

const AgreementsDetailTable: React.FC<IDetailTableProps> = ({
  label,
  items,
}) => {
  return (
    <Container className="w-full text-sm">
      <div className="px-18 py-12 bg-white opacity-80 rounded-t-sm">
        <span className="opacity-70">{label}</span>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div className={`grid grid-cols-2 gap-1 my-1`}>
            <div className="bg-white bg-opacity-30 p-12 text-center">
              <span className="opacity-70">{item.label}</span>
            </div>

            <div
              className="bg-white bg-opacity-30 p-12 text-center"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                style={{ width: "20px", height: "20px" }}
                type="checkbox"
                disabled
                checked={item.value}
              />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default AgreementsDetailTable;
