import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import ModeSwitch from "./ModeSwitch";
import PropTypes from "prop-types";

export default function FormAndTableWrapper(props) {
  const { textHeader, handleNavigate, textButton, children } = props;
  return (
    <Container maxWidth="md" sx={{ paddingY: "25px" }}>
      <Card>
        <CardContent>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={handleNavigate}
              sx={{ textTransform: "capitalize" }}
            >
              {textButton}
            </Button>
            <ModeSwitch />
          </Box>
          <Typography sx={{ textAlign: "center", marginY: 2 }} variant="h4">
            {textHeader}
          </Typography>
          {children}
        </CardContent>
      </Card>
    </Container>
  );
}

FormAndTableWrapper.propTypes = {
  textHeader: PropTypes.string.isRequired,
  handleNavigate: PropTypes.func.isRequired,
  textButton: PropTypes.any.isRequired,
  children: PropTypes.node.isRequired,
};
