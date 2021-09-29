import { Card, Button, Divider, Form, Input } from "antd";
import "../components/MintPopover.css";
import ETH from "../../utils/math-utils";
import { FormOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from "react";
import _ from "lodash";
import { useContractContext } from "../../context/contract-context";

const { Meta } = Card;

export interface PunkCardProps {
  punkToken: number,
  punkURI: string,
  punkName: string,
  punkDescription: string,
  punkClaimableTokens: number,
  claimTokens?: () => void
}

const PunkCard: React.FC<PunkCardProps> = ({
  punkToken,
  punkURI,
  punkName,
  punkDescription,
  punkClaimableTokens,
  claimTokens
}): React.ReactElement => {
  const { account, contracts } = useContractContext();
  const [ isEditingName, setIsEditingName ] = useState(false);
  const [ isEditingDesc, setIsEditingDesc ] = useState(false);
  const [ tokenEstimate, setTokenEstimate ] = useState(0);
  const [form] = Form.useForm();
  const contract = contracts.GamerPunksContract;

  const toggleEditName = () => {
    setIsEditingName(!isEditingName);
    setIsEditingDesc(isEditingName);
  }
  const toggleEditDesc = () => {
    setIsEditingDesc(!isEditingDesc);
    setIsEditingName(isEditingDesc);
  }
  const toggleOffEdit = () => {
    setIsEditingDesc(false);
    setIsEditingName(false);
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validatePunkChange = {
  };

  const onFinish = (values: any) => {
    if(isEditingName) {
      const name = values?.punk?.name || "";
      if(name.length > 0) {
        contract?.methods.changeName(punkToken, name)
          .send({ from: account }).then((response:any) =>{
          console.log(response);
        })
      }
    }
    if(isEditingDesc) {
      const description = values?.punk?.description || "";
      if(description.length > 0) {
        contract?.methods.changeDescription(punkToken, description)
          .send({ from: account }).then((response:any) =>{
          console.log(response);
        })
      }
    }
  };

  const estimateNameChangePrice = () => {
    const fields = form.getFieldsValue();
    const name = fields?.punk?.name || "";
    if((punkName || "") !== name) {
      return 365;
    }
    return 0;
  }
  const estimateDescChangePrice = () => {
    const fields = form.getFieldsValue();
    const description = fields?.punk?.description || "";

    if((punkDescription || "") !== description) {
      return description.length;
    }
    return 0;
  }

  const estimateChangePrice = () => {
    let priceEstimate = 0;
    if(isEditingName) {
      priceEstimate = estimateNameChangePrice();
    } else if(isEditingDesc) {
      priceEstimate =  estimateDescChangePrice();
    }
    setTokenEstimate(priceEstimate);
  }

  const printInfo = ()=>{
    if(isEditingName || isEditingDesc) {
      return (
        <>
          <Form form={form} name="nest-messages" onFinish={onFinish} validateMessages={validatePunkChange}>
            <Form.Item name={['punk', 'name']}>
              <Input placeholder="Name" onChange={estimateChangePrice} disabled={!isEditingName}/>
            </Form.Item>
            <Form.Item name={['punk', 'description']}>
              <Input.TextArea  placeholder="Description" onChange={estimateChangePrice} disabled={!isEditingDesc}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          <Divider></Divider>
          <p>Tokens Estimated: {tokenEstimate}</p>
        </>
      );
    } else {
      return (
        <>
          <Meta
            style={{textAlign:"start"}}
            title={`Name: ${punkName}`}
            description={`Description: ${punkDescription}`} />
          <Divider></Divider>
          <p>Tokens Accumulated: {ETH.prettifyEther(punkClaimableTokens)}</p>
          { ETH.prettifyEther(punkClaimableTokens) > 0.1 && <Button onClick={claimTokens}>Claim</Button> }
        </>
        )
    }
  }

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
      actions={[
        <EditOutlined key="edit" onClick={toggleEditName}/>,
        <FormOutlined key="setting" onClick={toggleEditDesc}/>,
        <CloseOutlined key="Close" onClick={toggleOffEdit}/>,
      ]}
    >
      { printInfo() }

    </Card>
  );
}

export default PunkCard;
