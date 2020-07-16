import React, { Component } from 'react'

const Modal = (props) => {
    return (
        // <div>
        //     <i className="fa fa-pen ml-1 pollhover" data-toggle="modal"
        //         data-target={`#${props.id}`} data-placement="top" title="Edit" style={{ color: "blue" }}
        //     ></i>

        //     <div class="modal fade" id={props.id} tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
        //         <div class="modal-dialog" role="document">
        //             <div class="modal-content">
        //                 <div class="modal-header">
        //                     <h5 class="modal-title">{props.title}</h5>
        //                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                         <span aria-hidden="true">&times;</span>
        //                     </button>
        //                 </div>
        //                 <div class="modal-body">
        //                     <div class="container-fluid">
        //                         Add rows here
        //                     </div>
        //                 </div>
        //                 <div class="modal-footer">
        //                     <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        //                     <button type="button" class="btn btn-primary">Save</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div>
            {/* <button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#modelId">
                Launch
        </button> */}
            <i className="fa fa-pen ml-1 pollhover" data-toggle="modal"
                data-target={props.id ? `#${props.id}` : "#modalId"} data-placement="top" title="Edit" style={{ color: "blue" }}
            ></i>
            <div class="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">{props.title}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="container-fluid">
                                {props.id}
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}


export default Modal