export interface BaseRecommendedPlanMealsAndFood {
  recommendedPlanMealsAndFoods: RecommendedPlanMealsAndFood[];
  chosenUserPlanMealAndFoods: ChosenUserPlanMealAndFood[];
}

export interface RecommendedPlanMealsAndFood {
  id: number;
  mealTypeId: number;
  mealTypeName: string;
  recommendedCalories: number;
  planMealFoods: PlanMealFood[];
}

export interface PlanMealFood {
  id: number;
  foodName: string;
  foodId: number;
  calories: number;
  ingredientGrams: number;
}

export interface ChosenUserPlanMealAndFood {
  id: number;
  planMealId: number;
  mealName: string;
  date: string;
  consumedCalories: number;
  excessive: boolean;
  light: boolean;
  recommendedFoods: RecommendedFood[];
  customFoods: CustomFood[];
}

export interface RecommendedFood {
  id: number;
  foodId: number;
  foodName: string;
  planMealFoodId: number;
  quantityInGrams: number;
  quantityInCalories: number;
  date: string;
}

export interface CustomFood {
  id: number;
  name: string;
  calories: number;
  date: string;
  quantityInGrams: number;
}

export class BaseRecommendedPlanMealsAndFoodModel
  implements BaseRecommendedPlanMealsAndFood
{
  recommendedPlanMealsAndFoods: RecommendedPlanMealsAndFood[] = [];
  chosenUserPlanMealAndFoods: ChosenUserPlanMealAndFood[] = [];
}
export class RecommendedPlanMealsAndFoodModel
  implements RecommendedPlanMealsAndFood
{
  id: number = 0;
  mealTypeId: number = 0;
  mealTypeName: string = '';
  recommendedCalories: number = 0;
  planMealFoods: PlanMealFood[] = [];
}
export class PlanMealFoodModel implements PlanMealFood {
  id: number = 0;
  foodName: string = '';
  foodId: number = 0;
  calories: number = 0;
  ingredientGrams: number = 0;
}
export class ChosenUserPlanMealAndFoodModel
  implements ChosenUserPlanMealAndFood
{
  id: number = 0;
  planMealId: number = 0;
  mealName: string = '';
  date: string = '';
  consumedCalories: number = 0;
  excessive: boolean = false;
  light: boolean = false;
  recommendedFoods: RecommendedFood[] = [];
  customFoods: CustomFood[] = [];
}
export class RecommendedFoodModel implements RecommendedFood {
  id: number = 0;
  foodId: number = 0;
  foodName: string = '';
  quantityInGrams: number = 0;
  quantityInCalories: number = 0;
  date: string = '';
  planMealFoodId: number = 0;
}

export class CustomFoodModel implements CustomFood {
  id: number = 0;
  name: string = '';
  calories: number = 0;
  date: string = '';
  quantityInGrams: number = 0;
}

///////////////////////////////////////

export interface BasePlanRecommendationAndGoals {
  planRecommendations: PlanRecommendation[];
  userPlanGoalLogs: UserPlanGoalLog[];
  dailyTargetCalories :number
      planTargetCalories: number
}

export interface PlanRecommendation {
  id: number;
  goalType: number;
  goalTypeName: string;
  recommendedValue: number;
}

export interface UserPlanGoalLog {
  id: number;
  planRecommendationId: number;
  actualValue: string;
  date: string;
}
export class BasePlanRecommendationAndGoalsModel
  implements BasePlanRecommendationAndGoals
{
  planRecommendations: PlanRecommendation[] = [];
  userPlanGoalLogs: UserPlanGoalLog[] = [];
  dailyTargetCalories :number = 0
  planTargetCalories: number = 0;
}
export class PlanRecommendationModel implements PlanRecommendation {
  id: number = 0;
  goalType: number = 0;
  goalTypeName: string = '';
  recommendedValue: number = 0;
}
export class UserPlanGoalLogModel implements UserPlanGoalLog {
  id: number = 0;
  planRecommendationId: number = 0;
  actualValue: string = '';
  date: string = '';
}

//////////////////////////////////////////
export interface BasePlanProducts {
  recommendedPlanProducts: RecommendedPlanProduct[];
  chosenUserPlanProducts: ChosenUserPlanProduct[];
}

export interface RecommendedPlanProduct {
  id: number;
  productId: number;
  productName: string;
  mealTypeId: number;
  mealTiming: number;
  mealTypeName: string;
}

export interface ChosenUserPlanProduct {
  id: number;
  planProductId: number;
  date: string;
  mealTiming: number;
  quantity: number;
}
export class BasePlanProductsModel implements BasePlanProducts {
  recommendedPlanProducts: RecommendedPlanProduct[] = [];
  chosenUserPlanProducts: ChosenUserPlanProduct[] = [];
}
export class RecommendedPlanProductModel implements RecommendedPlanProduct {
  id: number = 0;
  productId: number = 0;
  productName: string = '';
  mealTypeId: number = 0;
  mealTiming: number = 0;
  mealTypeName: string = '';
}
export class ChosenUserPlanProductModel implements ChosenUserPlanProduct {
  id: number = 0;
  planProductId: number = 0;
  date: string = '';
  mealTiming: number = 0;
  quantity: number = 0;
}

//////////////////////////////////////////
export type CommentsAndReplies = Comments[];

export interface Comments {
  commentId: number;
  comment: string;
  userPlanId: number;
  commentDate: string;
  userName: string;
  userId: number;
  replies: Reply[];
}

export interface Reply {
  replyId: number;
  userId: number;
  userName: string;
  replyDate: string;
  reply: string;
}

export class CommentsModel implements Comments {
  commentId: number = 0;
  comment: string = '';
  userPlanId: number = 0;
  commentDate: string = '';
  userName: string = '';
  userId: number = 0;
  replies: Reply[] = [];
}
export class ReplyModel implements Reply {
  replyId: number = 0;
  userId: number = 0;
  userName: string = '';
  replyDate: string = '';
  reply: string = '';
}

/////////////////////////////////////
export interface BaseTrainingVideos {
  recommendedPlanTrainingVideos: RecommendedPlanTrainingVideo[];
  chosenUserPlanTrainingVideos: ChosenUserPlanTrainingVideo[];
}

export interface RecommendedPlanTrainingVideo {
  id: number;
  mealTypeId: number;
  mealTypeName: string;
  trainingVideoId: number;
  title: string;
  videoUrl: string;
  isWatched?: boolean;
  goalName:string
  goalValue:string
  description: string;
}

export interface ChosenUserPlanTrainingVideo {
  id: number;
  planTrainingVideoId: number;
  isWatched: boolean;
  date: string;
}

export class BaseTrainingVideosModel implements BaseTrainingVideos {
  recommendedPlanTrainingVideos: RecommendedPlanTrainingVideo[] = [];
  chosenUserPlanTrainingVideos: ChosenUserPlanTrainingVideo[] = [];
}
export class RecommendedPlanTrainingVideoModel
  implements RecommendedPlanTrainingVideo
{
  id: number = 0;
  mealTypeId: number = 0;
  mealTypeName: string = '';
  trainingVideoId: number = 0;
  title: string = '';
  videoUrl: string = '';
  isWatched?: boolean = false;
  goalName:string=''
  goalValue:string=''
  description: string='';
}
export class ChosenUserPlanTrainingVideoModel
  implements ChosenUserPlanTrainingVideo
{
  id: number = 0;
  planTrainingVideoId: number = 0;
  isWatched: boolean = false;
  date: string = '';
}
