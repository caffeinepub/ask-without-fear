import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
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

  module Doubt {
    public func compareByTimestamp(d1 : Doubt, d2 : Doubt) : Order.Order {
      if (d1.timestamp < d2.timestamp) { return #less };
      if (d1.timestamp > d2.timestamp) { return #greater };
      #equal;
    };
  };

  module TeacherMessage {
    public func compareByTimestamp(m1 : TeacherMessage, m2 : TeacherMessage) : Order.Order {
      if (m1.timestamp < m2.timestamp) { return #less };
      if (m1.timestamp > m2.timestamp) { return #greater };
      #equal;
    };
  };

  let doubts = Map.empty<Text, Doubt>();
  var doubtCounter = 0;

  let teacherMessages = Map.empty<Text, TeacherMessage>();
  var teacherMessageCounter = 0;

  public shared ({ caller }) func submitDoubt(category : Text, message : Text) : async Text {
    let id = "doubt-" # doubtCounter.toText();
    doubtCounter += 1;

    let newDoubt : Doubt = {
      category;
      message;
      timestamp = Time.now();
    };

    doubts.add(id, newDoubt);
    id;
  };

  public query ({ caller }) func getAllDoubts() : async [Doubt] {
    doubts.values().toArray().sort(Doubt.compareByTimestamp);
  };

  public query ({ caller }) func getDoubtsByCategory(category : Text) : async [Doubt] {
    let filtered = List.empty<Doubt>();

    for (doubt in doubts.values()) {
      if (doubt.category == category) {
        filtered.add(doubt);
      };
    };

    filtered.toArray().sort(Doubt.compareByTimestamp);
  };

  public shared ({ caller }) func updateDoubt(doubtId : Text, newCategory : Text, newMessage : Text) : async () {
    switch (doubts.get(doubtId)) {
      case (null) {
        Runtime.trap("Doubt with ID " # doubtId # " not found");
      };
      case (?existingDoubt) {
        let updatedDoubt : Doubt = {
          category = newCategory;
          message = newMessage;
          timestamp = Time.now();
        };
        doubts.add(doubtId, updatedDoubt);
      };
    };
  };

  public shared ({ caller }) func deleteDoubt(doubtId : Text) : async () {
    switch (doubts.get(doubtId)) {
      case (null) {
        Runtime.trap("Doubt with ID " # doubtId # " not found");
      };
      case (?_) {
        doubts.remove(doubtId);
      };
    };
  };

  public shared ({ caller }) func sendTeacherMessage(teacherName : Text, studentName : Text, message : Text) : async Text {
    let id = "tmsg-" # teacherMessageCounter.toText();
    teacherMessageCounter += 1;

    let newMsg : TeacherMessage = {
      teacherName;
      studentName;
      message;
      timestamp = Time.now();
    };

    teacherMessages.add(id, newMsg);
    id;
  };

  public query ({ caller }) func getTeacherMessages() : async [TeacherMessage] {
    teacherMessages.values().toArray().sort(TeacherMessage.compareByTimestamp);
  };
};
