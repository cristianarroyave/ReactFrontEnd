import { useParams, useNavigate, useLocation } from 'react-router-dom';

export function withRouter( Child ) {
    return ( props ) => {
      const location = useLocation();
      const navigate = useNavigate();
      const params = useParams();
      return <Child { ...props } navigate={ navigate } location={ location } params = {params}/>;
    }
  }


  export default withRouter;