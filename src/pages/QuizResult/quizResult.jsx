import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { interpretationApi } from '../../api/axios';
import { LoaderResult } from '../../components/UIcomponents/Loaders/LoaderResult';
import { HolandRender } from './ResultHoland/HolandRender';
import { KlimovRender } from './ResultKlimov/KlimovRender';
import { OvcharovaRender } from './ResultOvcharova/OvcharovaRender';

export function QuizResult() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get('id');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const toggleRecommendations = () => {
    setShowRecommendations(!showRecommendations);
  };

  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [data, setData] = useState([]);
  const currentUrl = window.location.href;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await interpretationApi.get(
          `/services/interpretation/${id}`
        );
        if (Object.keys(response.data).length !== 0) {
          setResults(response.data.data.result);
          setData(response.data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching answers Test:', error);
      }
    };
    fetchData();
  }, [id]);
  const idResultQuiz = data.template_id;
  const idResultKlimova = 'd5bcac66-9da5-40fc-be35-b10bc1d7c824';
  const idResultOvcharova = 'e3c1f07b-28f7-42ab-8ef9-6f0c93b9e6bf';
  const idResultHoland = '16e217e0-98de-4c04-9451-174ab22f728c';

  const maxPoints = Math.max(...results.map((item) => item.points)); // получаем число с максимальным значением из шкал
  const maxRecommendations = results.filter((item) => {
    const match = results.find(
      (resultItem) => resultItem.description === item.description
    );
    return match && match.points === maxPoints;
  }); // получаем массив шкал с максимальными значениями
  const otherRecommendations = results.filter((item) => {
    const match = results.find(
      (resultItem) => resultItem.description === item.description
    );
    return !match || match.points !== maxPoints;
  }); // получаем массив шкал со значениями не равными максимальному
  if (loading) {
    return <LoaderResult />;
  }
  const renderContent = () => {
    if (idResultQuiz == idResultKlimova) {
      return (
        <KlimovRender
          results={results}
          maxRecommendations={maxRecommendations}
          otherRecommendations={otherRecommendations}
          showRecommendations={showRecommendations}
          toggleRecommendations={toggleRecommendations}
          currentUrl={currentUrl}
        />
      );
    } else if (idResultQuiz == idResultOvcharova) {
      return (
        <OvcharovaRender
          results={results}
          maxRecommendations={maxRecommendations}
          otherRecommendations={otherRecommendations}
          showRecommendations={showRecommendations}
          toggleRecommendations={toggleRecommendations}
          currentUrl={currentUrl}
        />
      );
    } else if (idResultQuiz == idResultHoland) {
      return (
        <HolandRender
          results={results}
          maxRecommendations={maxRecommendations}
          otherRecommendations={otherRecommendations}
          showRecommendations={showRecommendations}
          toggleRecommendations={toggleRecommendations}
          currentUrl={currentUrl}
        />
      );
    }
  };
  return <>{renderContent()}</>;
}
