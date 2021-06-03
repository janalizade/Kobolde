import React,{ useState, useEffect }  from "react";
import ChartistGraph from "react-chartist";
import { Bar, Line } from 'react-chartjs-2';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

function Dashboard() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const[x,setX]=useState([]);
  const { control, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });
 let title = [];
 let id=[];
 
 let titleproducts=[];
 const onSubmit=(data)=>{
   /*
  axios.get(`http://localhost:8000/api/v1/admin/categoryx/${data.title}`).then(res=>{
  const categories=res.data;
  setCategoryId(categories[Object.keys(categories)]._id);
  });

  */
  https://kobolde.ahoora.se:8443/api/v1/admin/productx/${data.title}
   
  //axios.get(`https://kobolde.ahoora.se:8443/api/v1/admin/productx/${data.title}`)  .then(res=>{
    axios.get(`https://kobolde.ahoora.se:8443/api/v1/admin/product/`)  .then(res=>{
    const categories=res.data;
    
    
       categories.forEach(element => {
         
        title.push(element.title);
        id.push(element[Object.keys(element)[0]].length); 
       
      });
    setProduct({
      Data: {
        labels: title,
        datasets: [
          {
            label: "IPL 2018/2019 Top Run Scorer",
            data:id,
            backgroundColor: [
              "#3cb371",
              "#0000FF",
              "#9966FF",
              "#4C4CFF",
              "#00FFFF",
              "#f990a7",
              "#aad2ed",
              "#FF00FF",
              "Blue",
              "Red"
            ]
          }
        ]
      }
    });

    });

}

 
 React.useEffect(()=>{
  axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/category').then(res=>{
  const categories=res.data;
  
   let productNum=0;
     categories.forEach(element => {
      title.push(element.title);
      console.log('title-----',title);
      id.push(element[Object.keys(element)[0]].length); 
      productNum++;
    });
    setX(productNum);
  setData({
    Data: {
      labels: title,
    
      datasets: [
        {
          label: "produktnummer",
          data:id,
          backgroundColor: [
            "Red",
            "Blue",
            "Yellow",
            "Green",
            "Purple",
            "Orange"
          ],
          borderColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
          borderWidth: 1
        }
      ]
    }
  });
});


},[]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Kategori </p>
                      <Card.Title as="h4">{x}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Revenue</p>
                      <Card.Title as="h4">$ 1,345</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Errors</p>
                      <Card.Title as="h4">23</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Followers</p>
                      <Card.Title as="h4">+45K</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Produkt Raport</Card.Title>
                <p className="card-category">
                  <Form  onSubmit={handleSubmit(onSubmit)}>
                  <Row>
                    <Col className="pr-1" md="5">
                      <Form.Group>
                        <label>Kategori</label>
                        <Form.Control
                          defaultValue=""
                          placeholder="Kategori"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    </Row> 
                    <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                  >
                    Sök Produkt
                  </Button>
                  </Form>
                </p>
              </Card.Header>
              <Card.Body>
              <div className="ct-chart" id="chartHours">
                  <ChartistGraph
                    data={{
                      labels: [
                        "9:00AM",
                        "12:00AM",
                        "3:00PM",
                        "6:00PM",
                        "9:00PM",
                        "12:00PM",
                        "3:00AM",
                        "6:00AM",
                      ],
                      series: [
                        [287, 385, 490, 492, 554, 586, 698, 695],
                        [67, 152, 143, 240, 287, 335, 435, 437],
                        [23, 113, 67, 108, 190, 239, 307, 308],
                      ],
                    }}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: false,
                      height: "245px",
                      axisX: {
                        showGrid: false,
                      },
                      lineSmooth: true,
                      showLine: true,
                      showPoint: true,
                      fullWidth: true,
                      chartPadding: {
                        right: 50,
                      },
                    }}
                    responsiveOptions={[
                      [
                        "screen and (max-width: 640px)",
                        {
                          axisX: {
                            labelInterpolationFnc: function (value) {
                              return value[0];
                            },
                          },
                        },
                      ],
                    ]}
                  />
                </div>
                
                
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                 Product <i className="fas fa-circle text-info"></i>
                   <i className="fas fa-circle text-danger"></i>
                  <i className="fas fa-circle text-warning"></i>
                  
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Produkt Statistik</Card.Title>
                <p className="card-category">Sista Prestanda</p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                 <ChartistGraph
                    data={{
                      labels: ["40%", "20%", "40%"],
                      series: [40, 20, 40],
                    }}
                    type="Pie"
                  />
                </div>
                <div className="legend">
                  <i className="fas fa-circle text-info"></i>
                  <i className="fas fa-circle text-danger"></i>
                   <i className="fas fa-circle text-warning"></i>
                  
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock"></i>
                  Campaign sent 2 days ago
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Kategori Raport</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
                <div className="ct-chart" id="chartActivity">
                <Bar data={data.Data} />
                </div>
              </Card.Body>
              <Card.Footer>
               
                <hr></hr>
                <div className="stats">
                
                 
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md="6">
       
      
 
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
