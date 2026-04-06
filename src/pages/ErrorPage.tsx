import Error403 from "@/components/errors/Error403";
import Error500 from "@/components/errors/Error500";
import Error503 from "@/components/errors/Error503";

interface ErrorPageProps {
  code: 403 | 500 | 503;
}

const ErrorPage = ({ code }: ErrorPageProps) => {
  switch (code) {
    case 403: return <Error403 />;
    case 500: return <Error500 />;
    case 503: return <Error503 />;
  }
};

export default ErrorPage;
