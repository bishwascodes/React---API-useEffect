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
    order: number
}

function Pokemon({
    name,
    image,
    height,
    weight,
    baseExperience,
    order,
}: PokemonProps) {
    return (
        <article className="card">
            <img className="img-fluid pokemon-sprite" src={image} alt={`${name} Pokemon`} />

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
                </div>
            </div>
        </article>
    )
}

export default Pokemon