const CustomModal = ({
    children,
    name,
    title,
    handleCancel,
    handleSave
    }: any) => {
  
    return (
      <>
        <div 
          className="modal modal-lg fade"
          id={`${name}myModal`}
          tabIndex={-1}
          aria-labelledby="customLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="customLabel">{title}</h5>
                <button type="button" 
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {handleCancel()}}
                ></button>
              </div>
              <div className="modal-body">
                {children}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {handleCancel()}}
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {handleSave()}} 
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  };
   
  export default CustomModal;