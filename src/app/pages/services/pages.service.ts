

import { AuthService } from './../../features/services/auth.service';
import { LocalStorageService } from './../../services/local-storage.service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PlanLDetalis, PlanLDetalisModel, PlanList, PlanListModel } from '../profile/myplan/myplan/myplan.component';
import { _ } from 'core-js';
import { NewAddress } from '../interfaces/new-address';
export interface PlanMealAndFood {
  planMealId?: number
  userPlanRecommendedFoodLog?: UserPlanRecommendedFoodLog[]
  userPlanCustomFoodLog?: UserPlanCustomFoodLog[]
}

export interface UserPlanRecommendedFoodLog {
  id: any
  planMealFoodId: number
  quantityInGrams: number
}

export interface UserPlanCustomFoodLog {

  name: string
  calories: number
  quantityInGrams: number
}
export interface toggleProductFav {
  productId: number;
}
@Injectable({
  providedIn: 'root',
})
export class PagesService {
  lookUpEnums: any = {
    AboutUs: 10,
    Vision: 20,
    Mission: 30,
    OurValue: 40,
    Other: 100,
  };
userPlanCustomFood:UserPlanCustomFoodLog[]=[

]
userPlanId:BehaviorSubject<number>=new BehaviorSubject(0)
  selectedPlanListId:BehaviorSubject<number>=new BehaviorSubject(0)
  selectedPlanList :BehaviorSubject<PlanLDetalis> =new BehaviorSubject(new PlanLDetalisModel())

  private baseUrl: string = environment.baseURL;
  filter = {};

  constructor(
    private _HttpClient: HttpClient,
    private _LocalStorageService: LocalStorageService,
    private _AuthService: AuthService
  ) {
    console.log('this.selectedPlanListId.value',this.selectedPlanListId.value)

  }
  changePassword(data:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}api/UsersApp/changepassword`,data)
  }
  getBestSeller(): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}api/Product/GetBestSellersProduct/20`
    );
  }
  getLookUpByStatus(type: number): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}api/LookUps/GetLookUpByStatus?type=${type}`
    );
  }
  getOurValue(): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/LookUps/GetAllLookUps?type=40`,
      this.filter
    );
  }
  getAds(): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/Ads/GetAllAds`,
      this.filter
    );
  }
  getAllReviews(): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/ReviewSection/GetAllReviewes`,
      this.filter
    );
  }
  getAllTips(): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/Tips/GetAllTips`,
      this.filter
    );
  }
  getTipsById(id: number): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}api/Tips/GetTipsById/${id}`);
  }
  getAllProducts(): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/Product/GetAllProducts`,
      this.filter
    );
  }
  getAllPackages(): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/Package/GetAllPackages`,
      this.filter
    );
  }

  postProductToCard(item: any): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/Product/AddProductToCartItem`,
      item
    );
  }
  getUserFavProducts(): Observable<any> {
    let x = {
      userId: this._AuthService.userData.value?.nameid,
    };
    return this._HttpClient.get(
      `${this.baseUrl}api/Product/GetUserFavoriteProducts`
    );
  }
  getAllUserCartItems(): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}api/Product/GetAllUserCartItems`
    );
  }
  deleteItemByCartId(id: number): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}api/Product/DeleteItemFromCartById/${id}`
    );
  }
  getProductById(id: number): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}api/Product/GetProductById/${id}`
    );
  }
 addReview(review: any): Observable<any> {
   return this._HttpClient.post(
     `${this.baseUrl}api/Product/AddReviewProduct`,
     review
   );
 }
  postToggleProductInFavorite(data: toggleProductFav): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/Product/ToggleProductInFavorite?productId=${data.productId}`,
      data
    );
  }
  contactUs(data: any): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/MailApp/SendEmailToOwner`,
      data
    );
  }
  getAddressesForUser(): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}api/Address/GetAddressForCustomer`
    );
  }
  deleteAddress(id: number): Observable<any> {
    return this._HttpClient.delete(
      `${this.baseUrl}api/Address/DeleteAddress/${id}`
    );
  }
  setAddressDefault(data: any): Observable<any> {
    return this._HttpClient.put(
      `${this.baseUrl}api/Address/SetAddressAsDefualt`,
      data
    );
  }
  addNewAddress(data: NewAddress): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/Address/AddNewAddress`,
      data
    );
  }
  getOrdersForTheUser(): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}api/Order/GetMyOrders`
    );
  }
getCategoryById(categoryId:number):Observable<any>{
  return this._HttpClient.get(`${this.baseUrl}api/Category/GetCategoryById/${categoryId}`)
}
  getUser(): Observable<any> {
    return this._HttpClient.get(`${this.baseUrl}api/UsersApp/GetUser/${this._AuthService.userData.value.nameid}`);
  }
  // myplan services
  listUserPlans(date:number|null): Observable<any> {
    if(date==null){
      return this._HttpClient.get(

        `${this.baseUrl}api/UserPlan/ListUserPlans?userId=${this._AuthService.userData.value.nameid}`
      );

    }else{
      return this._HttpClient.get(
        // `${this.baseUrl}api/UserPlan/ListUserPlans?userId=35`
        `${this.baseUrl}api/UserPlan/ListUserPlans?userId=${this._AuthService.userData.value.nameid}&month=${date}`
      );

    }
  }

  getUserPlanById(planId: number): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}api/UserPlan/GetUserPlanDetails?userId=${this._AuthService.userData.value.nameid}&planId=${planId}`
    );
  }

  getRecommendedMealsAndFoods(planId: number,selectedDate:string|null): Observable<any> {
    let data={
      userId:this._AuthService.userData.value.nameid,
      planId,
      date:selectedDate
    }
    if(selectedDate==null){

      return this._HttpClient.get(
        `${this.baseUrl}api/UserPlan/UserPlanRecommendedMealsAndFoods?userId=${this._AuthService.userData.value.nameid}&planId=${planId}`
      );
    }else{

      return this._HttpClient.post(
        `${this.baseUrl}api/UserPlan/UserPlanRecommendedMealsAndFoods`,data
      );

    }
  }
  getUserPlanRecommendationAndGoals(planId:number,selectedDate:string|null): Observable<any> {
    if(selectedDate==null){
      return this._HttpClient.get(`${this.baseUrl}api/UserPlan/UserPlanRecommendationsAndGoals?userId=${this._AuthService.userData.value.nameid}&planId=${planId}`)

    }else{

      return this._HttpClient.get(`${this.baseUrl}api/UserPlan/UserPlanRecommendationsAndGoals?userId=${this._AuthService.userData.value.nameid}&planId=${planId}&date=${selectedDate}`)
    }
  }
  getUserPlanProducts(planId: number,selectedDate:string|null): Observable<any> {
    if(selectedDate==null){

      return this._HttpClient.get(
        `${this.baseUrl}api/UserPlan/UserPlanRecommendedProducts?userId=${this._AuthService.userData.value.nameid}&planId=${planId}`
      );
    }else{
      return this._HttpClient.get(
        `${this.baseUrl}api/UserPlan/UserPlanRecommendedProducts?userId=${this._AuthService.userData.value.nameid}&planId=${planId}&date=${selectedDate}`
      );

    }
  }
  getUserWeightHistory():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}api/UserPlan/UserWeightHistory?userId=${this._AuthService.userData.value.nameid}`)
  }
  getUserBodyDetails():Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}api/UserPlan/GetUserBodyDetails/${this._AuthService.userData.value.nameid}`)
  }
  getUserPlanCommentsWithReplies(userPlanId:number): Observable<any> {
    return this._HttpClient.get(
      `${this.baseUrl}api/UserPlan/UserPlanCommentsWithReplies?userId=${this._AuthService.userData.value.nameid}&userPlanId=${userPlanId}`
    );
  }
  addCommentToUserPlan(data: any): Observable<any> {

    return this._HttpClient.post(
      `${this.baseUrl}api/UserPlan/LogOrEditUserComment?userId=${this._AuthService.userData.value.nameid}`,
      data
    );
  }
  getTrainingVideo(userPlanId: number,date:string|null): Observable<any> {
    if(date==null){
      return this._HttpClient.get(
        `${this.baseUrl}api/UserPlan/UserPlanRecommendedTrainingVideos?userId=${this._AuthService.userData.value.nameid}&planId=${userPlanId}`
      );

    }else{
      return this._HttpClient.get(
        `${this.baseUrl}api/UserPlan/UserPlanRecommendedTrainingVideos?userId=${this._AuthService.userData.value.nameid}&planId=${userPlanId}&date=${date}`
      );
    }
    }
  logTrainingVideo(data: any): Observable<any> {
    return this._HttpClient.post(
      `${this.baseUrl}api/UserPlan/LogUserPlanTrainingVideos?userId=${this._AuthService.userData.value.nameid}&userPlanId=${this.userPlanId.value}`,
      data
    );
  }
  logUserPlanMealsAndFoods(data:any): Observable<any> {

    return this._HttpClient.post(`${this.baseUrl}api/UserPlan/LogUserPlanMealsAndFoods?userId=${this._AuthService.userData.value.nameid}&userPlanId=${this.selectedPlanList.value.id}`,data)//26
  }
  logUserPlanGoals(data:any): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}api/UserPlan/LogUserPlanGoals?userId=${this._AuthService.userData.value.nameid}&planId=${this.selectedPlanListId.value}`,data)//21
  }
  logUserPlanProducts(data:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}api/UserPlan/LogUserPlanProducts?userId=${this._AuthService.userData.value.nameid}&userPlanId=${this.userPlanId.value}`,data)
  }
  logUserDailyWeight(data:any):Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}api/UserPlan/LogUserDailyWeight?userId=${this._AuthService.userData.value.nameid}`,data)
  }
}
