import React from 'react';

interface Button {
    label: string;
    onClick: () => void;
}

interface CentralModuleProps {
    title: string;
    body: string;
    buttons: Button[];
    logo: boolean;
}

const CentralModule: React.FC<CentralModuleProps> = ({ title, body, buttons, logo }) => {
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header d-flex justify-content-between">
                            <span className="m-2 fs-4">{title}</span>
                            { logo ?
                            <div>
                                <img className="mt-2" src="images/AleggoLogo.png" alt="Aleggo logo" style={{ height: '40px' }} />
                            </div> : null
                            }
                        </div>
                        <div className="card-body">
                            <p>{body}</p>
                            <div className="button-group">
                                {buttons.map((button, index) => (
                                    <button
                                        key={index}
                                        onClick={button.onClick}
                                        className="btn btn-primary"
                                        style={{ marginRight: '5px' }}
                                    >
                                        {button.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CentralModule;
