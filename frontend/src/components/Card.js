import React from 'react';

const Card = ({ cards }) => (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
        padding: '20px'
    }}>
        {cards.map((card) => (
            <div key={card.id} style={{
                width: card.isPrimary ? '100%' : 'calc(50% - 10px)',
                maxWidth: card.isPrimary ? '600px' : '300px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                margin: '20px',
                textAlign: 'left',
                background: '#fff',
                alignSelf: card.isPrimary ? 'stretch' : 'flex-start'
            }}>
                {card.background && (
                    <div style={{
                        height: '200px',
                        backgroundImage: `url(${card.background})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}></div>
                )}
                <div style={{ padding: '20px' }}>
                    <h2>{card.title}</h2>
                    {card.content && <p>{card.content}</p>}
                    <button style={{
                        padding: '10px',
                        marginTop: '10px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007bff',
                        color: 'white',
                        cursor: 'pointer'
                    }}>
                        {card.buttonLabel}
                    </button>
                </div>
            </div>
        ))}
    </div>


);

export default Card;
