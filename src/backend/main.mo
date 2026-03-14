import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  // ── Original stable types (unchanged to preserve upgrade compatibility) ──
  type Doubt = {
    category : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type TeacherMessage = {
    teacherName : Text;
    studentName : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // ── New type for storing teacher answers (separate map, no upgrade issue) ──
  type DoubtAnswer = {
    teacherName : Text;
    answer : Text;
    answeredAt : Time.Time;
  };

  // ── Return type combining doubt + optional answer ──
  type DoubtInfo = {
    id : Text;
    category : Text;
    message : Text;
    timestamp : Time.Time;
    answer : ?Text;
    answeredBy : ?Text;
    answeredAt : ?Time.Time;
  };

  // ── Stable storage (original vars kept to avoid discard errors) ──
  let doubts = Map.empty<Text, Doubt>();
  var doubtCounter = 0;

  // Preserved from previous version to avoid M0169 discard errors
  let teacherMessages = Map.empty<Text, TeacherMessage>();
  var teacherMessageCounter = 0;

  // New stable map for answers (fresh — no upgrade conflict)
  let doubtAnswers = Map.empty<Text, DoubtAnswer>();

  // ── Helpers ──
  func makeDoubtInfo(id : Text, d : Doubt) : DoubtInfo {
    let ans = doubtAnswers.get(id);
    {
      id;
      category = d.category;
      message = d.message;
      timestamp = d.timestamp;
      answer = switch ans { case (?a) ?a.answer; case null null };
      answeredBy = switch ans { case (?a) ?a.teacherName; case null null };
      answeredAt = switch ans { case (?a) ?a.answeredAt; case null null };
    };
  };

  func compareByTimestamp(d1 : DoubtInfo, d2 : DoubtInfo) : Order.Order {
    if (d1.timestamp > d2.timestamp) { return #less };
    if (d1.timestamp < d2.timestamp) { return #greater };
    #equal;
  };

  // ── Public API ──
  public shared func submitDoubt(category : Text, message : Text) : async Text {
    let id = "doubt-" # doubtCounter.toText();
    doubtCounter += 1;
    doubts.add(id, { category; message; timestamp = Time.now() });
    id;
  };

  public query func getAllDoubts() : async [DoubtInfo] {
    let result = List.empty<DoubtInfo>();
    for ((id, d) in doubts.entries()) {
      result.add(makeDoubtInfo(id, d));
    };
    result.toArray().sort(compareByTimestamp);
  };

  public query func getUnansweredDoubts() : async [DoubtInfo] {
    let result = List.empty<DoubtInfo>();
    for ((id, d) in doubts.entries()) {
      if (doubtAnswers.get(id) == null) {
        result.add(makeDoubtInfo(id, d));
      };
    };
    result.toArray().sort(compareByTimestamp);
  };

  public query func getAnsweredDoubts() : async [DoubtInfo] {
    let result = List.empty<DoubtInfo>();
    for ((id, d) in doubts.entries()) {
      if (doubtAnswers.get(id) != null) {
        result.add(makeDoubtInfo(id, d));
      };
    };
    result.toArray().sort(compareByTimestamp);
  };

  public shared func answerDoubt(doubtId : Text, teacherName : Text, answer : Text) : async () {
    switch (doubts.get(doubtId)) {
      case (null) {
        Runtime.trap("Doubt " # doubtId # " not found");
      };
      case (?_) {
        doubtAnswers.add(doubtId, {
          teacherName;
          answer;
          answeredAt = Time.now();
        });
      };
    };
  };

  public shared func deleteDoubt(doubtId : Text) : async () {
    switch (doubts.get(doubtId)) {
      case (null) {
        Runtime.trap("Doubt " # doubtId # " not found");
      };
      case (?_) {
        doubts.remove(doubtId);
        doubtAnswers.remove(doubtId);
      };
    };
  };
};
