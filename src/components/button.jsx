import {Button} from "@nextui-org/react";

export default function ButtonComponent(props) {
  return (
    <Button type={props.type} color="primary">
      {props.text}
    </Button>
  );
}