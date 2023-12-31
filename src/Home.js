import { SuprSendProvider, useUnseenCount } from "@suprsend/react-inbox";
import { ReactComponent as BellIcon } from "./assets/Bell.svg";
import styled from "styled-components";
import { useState } from "react";
import { Notifications } from "./Notifications";

const stores = [
  { storeId: "Transactional", label: "General" },
  { storeId: "System", label: "Promotional" },
];

export default function Home() {
  return (
    <SuprSendProvider
      workspaceKey={process.env.REACT_APP_WORKSPACE_KEY}
      distinctId={process.env.REACT_APP_DISTINCT_ID}
      subscriberId={process.env.REACT_APP_SUBSCRIBER_ID}
      stores={stores}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 32,
        }}
      >
        <p>Home Page</p>
        <Bell />
      </div>
    </SuprSendProvider>
  );
}

function Bell() {
  const { unSeenCount, markAllSeen } = useUnseenCount();

  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={() => {
          if (!show) {
            markAllSeen();
          }
          setShow((prev) => !prev);
        }}
      >
        <CountDiv>
          <CountText>{unSeenCount}</CountText>
        </CountDiv>
        <BellIcon height={24} width={24} color="#000" />
      </div>

      {show && (
        <PopOverNotifsContainer id="ss-notification-container">
          <Notifications stores={stores} type="POPUP" />
        </PopOverNotifsContainer>
      )}
    </div>
  );
}

const CountDiv = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  background-color: #066af3;
  border-radius: 50%;
  margin-left: 10px;
  margin-top: -10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CountText = styled.p`
  color: #fff;
  font-size: 10px;
`;

const PopOverNotifsContainer = styled.div`
  height: 500px;
  width: 400px;
  position: absolute;
  background: white;
  right: -20px;
  border-radius: 5px;
  overflow: scroll;
  border: 1px solid #dbdada;
`;
