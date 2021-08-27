import { Card, Button, Divider, Form, Input } from "antd";
import "../components/MintPopover.css";
import ETH from "../../utils/math-utils";
import { FormOutlined, EditOutlined, CloseOutlined } from '@ant-design/icons';
import { useState } from "react";
import _ from "lodash";
import { useContractContext } from "../../context/contract-context";

const { Meta } = Card;

export interface RangerCardProps {
  rangerToken: number,
  rangerURI: string,
  rangerName: string,
  rangerDescription: string,
  rangerClaimableTokens: number,
  claimTokens?: () => void
}

const RangerCard: React.FC<RangerCardProps> = ({
  rangerToken,
  rangerURI,
  rangerName,
  rangerDescription,
  rangerClaimableTokens,
  claimTokens
}): React.ReactElement => {
  const { account, contracts } = useContractContext();
  const [ isEditingName, setIsEditingName ] = useState(false);
  const [ isEditingDesc, setIsEditingDesc ] = useState(false);
  const [ tokenEstimate, setTokenEstimate ] = useState(0);
  const [form] = Form.useForm();
  const contract = contracts.CyberPunkRangersContract;

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

  const validateRangerChange = {
  };

  const onFinish = (values: any) => {
    console.log(values);
    if(isEditingName) {
      const name = values?.ranger?.name || "";
      if(name.length > 0) {
        contract?.methods.changeName(rangerToken, name)
          .send({ from: account }).then((response:any) =>{
          console.log(response);
        })
      }
    }
    if(isEditingDesc) {
      const description = values?.ranger?.description || "";
      if(description.length > 0) {
        contract?.methods.changeDescription(rangerToken, description)
          .send({ from: account }).then((response:any) =>{
          console.log(response);
        })
      }
    }
  };

  const estimateNameChangePrice = () => {
    const fields = form.getFieldsValue();
    const name = fields?.ranger?.name || "";
    if((rangerName || "") !== name) {
      return 365;
    }
    return 0;
  }
  const estimateDescChangePrice = () => {
    const fields = form.getFieldsValue();
    const description = fields?.ranger?.description || "";

    if((rangerDescription || "") !== description) {
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
          <Form form={form} name="nest-messages" onFinish={onFinish} validateMessages={validateRangerChange}>
            <Form.Item name={['ranger', 'name']}>
              <Input placeholder="Name" onChange={estimateChangePrice} disabled={!isEditingName}/>
            </Form.Item>
            <Form.Item name={['ranger', 'description']}>
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
            title={`Name: ${rangerName}`}
            description={`Description: ${rangerDescription}`} />
          <Divider></Divider>
          <p>Tokens Accumulated: {ETH.prettifyEther(rangerClaimableTokens)}</p>
          { ETH.prettifyEther(rangerClaimableTokens) > 0.1 && <Button onClick={claimTokens}>Claim</Button> }
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

export default RangerCard;
