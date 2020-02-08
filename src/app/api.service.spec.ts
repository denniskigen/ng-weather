import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { of, throwError } from 'rxjs';

import { ApiService } from './api.service';

const activitiesUrl = 'http://localhost:8080/api/activities';
const moodsUrl = 'http://localhost:8080/api/moods';
const mockActivities = ['Dancing', 'Kayaking', 'Pilates', 'Skiing'];
const mockMoods = ['Happy', 'Nervous', 'Downbeat', 'Excited'];

const mockErrorResponse = new HttpErrorResponse({
  error: 'Internal Server Error',
  status: 500,
  statusText: 'An internal server error occurred'
});

describe('ApiService (with spies)', () => {
  let httpClientSpy: { get: jasmine.Spy, post: jasmine.Spy, delete: jasmine.Spy };
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClientSpy = jasmine.createSpyObj('httpClient', ['get', 'post', 'delete']);
    service = new ApiService(<any> httpClientSpy);
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should be created', () => {
    service = TestBed.inject(ApiService);
    expect(service).toBeTruthy();
  });

  it('has all its methods defined', () => {
    expect(service.createActivity).toBeDefined();
    expect(service.createMood).toBeDefined();
    expect(service.deleteActivity).toBeDefined();
    expect(service.deleteMood).toBeDefined();
    expect(service.getActivities).toBeDefined();
    expect(service.getMoods).toBeDefined();
  });

  it('should return an observable response from fetching activities', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockActivities));
    service.getActivities().subscribe(
      (activities) => {
        expect(activities.length).toEqual(4);
        expect(activities[0]).toEqual(mockActivities[0]);
        expect(activities[1]).toEqual(mockActivities[1]);
        expect(activities[2]).toEqual(mockActivities[2]);
        expect(activities[3]).toEqual(mockActivities[3]);
        done();
      }, (err) => {
        console.error('test err: ', err);
        fail('expected activities, not an error');
        done();
      }
    );
  });

  it('should throw an error when the database cannot be reached', (done: DoneFn) => {
    httpClientSpy.get.and.callFake(() => throwError(mockErrorResponse));

    service.getActivities().subscribe(
      (activities) => fail('expected an error, not activities'),
      (err) => {
        expect(err).toBeTruthy();
        expect(err.status).toEqual(500);
        expect(err.statusText).toEqual('An internal server error occurred');
        expect(err.error).toEqual('Internal Server Error');
        expect(err.message).toContain('500 An internal server error occurred');
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  it('should return an observable response from fetching moods', (done: DoneFn) => {
    httpClientSpy.get.and.returnValue(of(mockMoods));
    service.getActivities().subscribe(
      (moods) => {
        expect(moods.length).toEqual(4);
        expect(moods[0]).toEqual(mockMoods[0]);
        expect(moods[1]).toEqual(mockMoods[1]);
        expect(moods[2]).toEqual(mockMoods[2]);
        expect(moods[3]).toEqual(mockMoods[3]);
        done();
      }, (err) => {
        console.error('test err: ', err);
        fail('expected activities, not an error');
        done();
      }
    );
  });

  it('should throw an error when the database cannot be reached', (done: DoneFn) => {
    httpClientSpy.get.and.callFake(() => throwError(mockErrorResponse));

    service.getActivities().subscribe(
      (moods) => fail('expected an error, not moods'),
      (err) => {
        expect(err).toBeTruthy();
        expect(err.status).toEqual(500);
        expect(err.statusText).toEqual('An internal server error occurred');
        expect(err.error).toEqual('Internal Server Error');
        expect(err.message).toContain('500 An internal server error occurred');
        expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });
});

describe('ApiService (with mocks): ', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ApiService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should create an activity and return it', () => {
    const newActivity = { id: 5, name: 'Programming' };

    service.createActivity(newActivity).subscribe(
      (activity) => {
        expect(activity).toEqual(newActivity, 'should return the new activity');
      }, (err) => {
        console.error('test err: ', err);
        fail('expected an activity, not an error');
      }
    );

    // should have made one request to POST activity
    const req = httpTestingController.expectOne(activitiesUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newActivity);
    expect(req.request.url).toEqual(activitiesUrl);

    // expect server to return the activity after POST
    const expectedResponse = new HttpResponse(
      { status: 201, statusText: 'Created', body: newActivity });
    req.event(expectedResponse);
  });

  it('should create a mood and return it', () => {
    const newMood = { id: 5, name: 'Chilling' };

    service.createMood(newMood).subscribe(
      (mood) => {
        expect(mood).toEqual(newMood, 'should return the new mood');
      }, (err) => {
        console.error('test err: ', err);
        fail('expected a mood, not an error');
      }
    );

    // should have made one request to POST activity
    const req = httpTestingController.expectOne(moodsUrl);
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(newMood);
    expect(req.request.url).toEqual(moodsUrl);

    // expect server to return the activity after POST
    const expectedResponse = new HttpResponse(
      { status: 201, statusText: 'Created', body: newMood });
    req.event(expectedResponse);
  });
});
