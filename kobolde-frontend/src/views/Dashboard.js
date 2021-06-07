import React,{ useState, useEffect }  from "react";
import ChartistGraph from "react-chartist";
import { Bar, Line } from 'react-chartjs-2';
import { useForm, Controller } from "react-hook-form";
import axios from 'axios';
import NativeSelect from '@material-ui/core/NativeSelect';
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
import { SystemUpdate } from "@material-ui/icons";
const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 14
  }
};
const options = {
  title: {
    display: true,
    text: "Chart Title"
  },
  scales: {
    yAxes: [
      {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 100
        }
      }
    ]
  }
};
function Dashboard() {
  const [data, setData] = useState([]);
  const [product, setProduct] = useState([]);
  const[x,setX]=useState([]);
  const[y,Sety]=useState([]);
  const [categoryItem,setCategoryItem]=React.useState([]);
  const [categoryId,setCategoryId]=React.useState([]);
  const[productItem,setProductItem]=React.useState([]);
  const { control, handleSubmit, errors, formState, reset } = useForm({
    mode: "onChange",
  });
 let title = [];
 let id=[];
 let arbetsGang=[];
 let arbetsTid=[];
 
 const handleChange = (event) => {
  setCategoryId(event.target.value);
  console.log('id',event.target.value);

};
 const onSubmit=(data)=>{
    axios.get(`https://kobolde.ahoora.se:8443/api/v1/admin/productx/${categoryId}`).then(res=> {
    const products=res.data.product;
    products.forEach(element=>{
      title.push(element.title);
      arbetsTid.push(element.arbetsTid);
      arbetsGang.push(element.arbetsGang);
      console.log('arbetsTid----',arbetsTid);
      console.log('arbetsGang----',arbetsGang);

    })
     setProductItem(products); 
     console.log('products',products);
  
    setProduct({
      Data: {
        labels: title,
        series: [
          arbetsTid,
          arbetsGang,
        ],
        datasets: [
          {
            label: "IPL 2019/2020 Top Run Scorer",
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
  arbetsGang=[];
  arbetsTid=[];
  axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/product').then(res=>{
    const products=res.data;
    
     let productNum=0;
       products.forEach(element => {
       productNum++;
      });
      Sety(productNum);
    })
 
  axios.get('https://kobolde.ahoora.se:8443/api/v1/admin/category').then(res=>{
  const categories=res.data;
  setCategoryItem(categories);
   let categoryNum=0;
     categories.forEach(element => {
      title.push(element.title);
      id.push(element[Object.keys(element)[0]].length); 
      categoryNum++;
    });
    setX(categoryNum);
  setData({
    Data: {
      labels: title,
      series: [
        id      
      ],
      datasets: [
        {
          label: "produktnummer",
          data:id,
          fill:true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "#3cb371",
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
                  Updatera Nu
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
                      <p className="card-category">Produkt</p>
                      <Card.Title as="h4">{y}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Updatera Nu
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
                  
                    <Col className="pr-1" md="5">
                    <p className="card-category">Välj kategori för Produkt listen:</p>
                  <NativeSelect
                  id="demo-controlled-open-select"
                  open={open}
                  onChange={handleChange}                 
                >
                {categoryItem.map(item =>(
                  <option value={item._id}>
                    {item.title }
                  </option>
                  
                ))}
                </ NativeSelect>
                    </Col>
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
                    data={product.Data}
                    type="Line"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: true,
                      height: "245px",
                      axisX: {
                        showGrid: true,
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
                 arbetsTid <i className="fas fa-circle text-info"></i>
                 arbetsGång <i className="fas fa-circle text-danger"></i>
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
        <Col md="8">
          <Card>
              <Card.Header>
                <Card.Title as="h4">Kategori Raport</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
              
                <Bar data={data.Data}  legend={legend} options={options}/>
                    </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                </div>
              </Card.Footer>
            </Card>
      
 
          </Col>
          <Col md="4">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Kategori Raport</Card.Title>
                <p className="card-category"></p>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                    <Line data={data.Data}  legend={legend} options={options}/>
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
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Produkt Raport</Card.Title>
                <p className="card-category">
                  <Form  onSubmit={handleSubmit(onSubmit)}>
                  
                    <Col className="pr-1" md="5">
                    <p className="card-category">Välj kategori för Produkt listen:</p>
                  <NativeSelect
                  id="demo-controlled-open-select"
                  open={open}
                  onChange={handleChange}                 
                >
                {categoryItem.map(item =>(
                  <option value={item._id}>
                    {item.title }
                  </option>
                ))}
                </ NativeSelect>
                    </Col>
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
                    data={product.Data}
                    type="Bar"
                    options={{
                      low: 0,
                      high: 800,
                      showArea: true,
                      height: "245px",
                      axisX: {
                      showGrid: true,
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
                 arbetsTid <i className="fas fa-circle text-info"></i>
                 arbetsGång <i className="fas fa-circle text-danger"></i>
               </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                </div>
              </Card.Footer>
            </Card>
          </Col>
          </Row>
      </Container>
    </>
  );
}

export default Dashboard;
