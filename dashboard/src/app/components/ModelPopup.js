import React, {useState, useEffect} from 'react'

const ModelPopup = (props) => {

    const [data, setData] = useState(props.data);

    useEffect(() => {
        setData(props.data);
    }, [props.data]);

    var bodyObj = [];

    if (props.formLayout){
        for (var i=0; i < props.formLayout.length; i++){
            const fieldObj = props.formLayout[i]
            bodyObj.push(
                <div class="form-group">
                    <label for={fieldObj.dataField}>{fieldObj.text}</label>
                    <input type={fieldObj.type} class="form-control" id={fieldObj.dataField} placeholder={data && data[fieldObj.dataField]} readOnly={!fieldObj.mutable} />
                </div>
            )
        }
    }
        
    return (
        <div>
            <button type="button" class="btn btn-secondary btn-sm" data-toggle="modal" data-target={`#${props.id}ModalCenter`}>
                {props.label}
            </button>
            <div class="modal fade show" id={`${props.id}ModalCenter`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="false">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLongTitle">{props.label}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form onSubmit={(e) => props.onSubmit(e.target, props.label, e)}>
                            <div class="modal-body">
                                    {bodyObj.map((val, i) => val)}
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="submit" class="btn btn-primary" >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModelPopup;