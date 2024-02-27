import { APP_ROUTES } from "../../constants/route.const.js";
import "./documents.scss";

const Documents = () =>{
return(
    <>
    <section className="list_docs">
        <div> 
            <h1>Documents</h1>
            <a className="btn" href={APP_ROUTES.DOC}>Liste des documents</a> 
<ul>
    {documents.map((document) =>
    <li key={document.id}> {document.name} </li>)
    };
</ul>
       </div>
    </section>
    </>
);
};

export default Documents;