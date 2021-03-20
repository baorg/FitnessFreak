import BeautyIcon from './beauty';
import BodyBuildingIcon from './bodybuiling';
import EntertainmentIcon from './entertainment';
import FashionIcon from './fashion';
import FitnessIcon from './fitness';
import LifestyleIcon from './lifestyle';
import NutritionIcon from './nutrition';
import SportsIcon from './sports';
import YogaIcon from './yoga';


export default function({ category, ...props }){
    switch(category.toLowerCase()){
        case 'beauty':
            return <BeautyIcon {...props} />;
        
        case 'bodybuilding':
        case 'body building':
            return <BodyBuildingIcon {...props} />;
        
        case 'entertainment':
            return <EntertainmentIcon {...props} />;
        
        case 'fashion':
            return <FashionIcon {...props} />;
        
        case 'fitness':
            return <FitnessIcon {...props} />;
        
        case 'lifestyle':
            return <LifestyleIcon {...props} />;
        
        case 'nutrition':
            return <NutritionIcon {...props} />;
        
        case 'sports':
            return <SportsIcon {...props} />;
        
        case 'yoga':
            return <YogaIcon {...props} />;
        
        default:
            return <FitnessIcon {...props} />;
    }

}