// Possible information includes:

// Name

// Image

// Height

// Weight

// Base experience

// Other information you find in the API

export type PokemonProps = {
    name: string,
    image: string,
    height: number,
    weight: number,
    baseExperience: number,
    order: number,
    health: number,
    onClickAction : () => void
}



function Pokemon({
    name,
    image,
    height,
    weight,
    baseExperience,
    order,
    health,
    onClickAction
}: PokemonProps) {
    return (
        <div className="card shadow text-center col-3">
            <img className="text-center pokemon-sprite" src={image} alt={`${name} Pokemon`} />

            <div className="card-content">
                <h1 className="name">{name}</h1>

                <div className="card-body">
                    <div>
                        <strong>Height : </strong>{height}
                    </div>
                    <div>
                        <strong>Weight : </strong>{weight}
                    </div>
                    <div>
                        <strong>Base experience :</strong>{baseExperience}
                    </div>
               
                    <p> <strong>Order : </strong>{order} </p>

                    <p> <strong>Health : </strong>{health} </p>

                    <button className="btn btn-danger" onClick={onClickAction}>Damage Pokemon</button>
                </div>
            </div>
        </div>
    )
}

export default Pokemon